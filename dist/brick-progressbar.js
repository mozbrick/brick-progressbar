(function () {
  var currentScript = document._currentScript || document.currentScript;

  var boolStringToBoolean = {
    "true": true,
    "false": false,
    null : false,
    "": true
  };
  var mix = function(obj, proto){
    for(var prop in proto){
      if(proto.hasOwnProperty(prop)){
        obj[prop] = proto[prop];
      }
    }
  };

  var defaultOptions = {
    min:0,
    max:100,
    type:"defaults",
    value:0
  };

  var booleanAttrs = ["active", "striped", "intermediate", "showActualValue", "showStatus"];
  var integerAttrs = ["value", "min", "max"];
  var progressBarTypes = ["success", "info", "warning", "danger", "default"];

  var BrickProgressbarElementPrototype = Object.create(HTMLElement.prototype);

  mix(BrickProgressbarElementPrototype, {
    // Lifecycle methods
    createdCallback: function () {
      var importDoc = currentScript.ownerDocument;
      var template = importDoc.querySelector('#brick-progressbar-template');

      // fix styling for polyfill
      if (Platform.ShadowCSS) {
        var styles = template.content.querySelectorAll('style');
        for (var i = 0; i < styles.length; i++) {
          var style = styles[i];
          var cssText = Platform.ShadowCSS.shimStyle(style, ' ');
          Platform.ShadowCSS.addCssToDocument(cssText);
          style.remove();
        }
      }

      var shadowRoot = this.createShadowRoot();
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.render();
    },
    attachedCallback: function () {

    },
    detachedCallback: function () {

    },
    attributeChangedCallback: function (attr, oldVal, newVal) {
      console.log(arguments);
//      if (attr in attrs) {
//        attrs[attr].call(this, oldVal, newVal);
//      }
    },
    getBooleanAttribute: function (attr) {
      var val = boolStringToBoolean[this.getAttribute(attr)];
      if(val === undefined){
        return false;
      }
      return val;
    },
    getIntegerAttribute: function (attr) {
      var val = this.getAttribute(attr);
      if(val !== null){
        return parseInt(val, 10);
      }else{
        return defaultOptions[attr];
      }
    },
    setIntegerAttribute: function (attr, newVal) {
      if(typeof newVal === "number"){
        if (this[attr] !== newVal + "") {
          this.setAttribute(attr, newVal);
          this.render();
        }
      }
    },
    toggle: function (attr) {
      if(booleanAttrs.indexOf(attr) !== -1){
        this.setBooleanAttribute(attr, !this.setBooleanAttribute(attr));
      }
    },
    setBooleanAttribute: function (attr, newVal) {
      if (this[attr] !== newVal && typeof newVal === "boolean") {
        if(newVal === true){
          this.setAttribute(attr,"");
        }else{
          this.removeAttribute(attr);
        }
        return true;
      }else{
        return false;
      }
    },
    render: function () {
      var p = ((this.value - this.min)/(this.max -this.min) * 100);
      if(p>100){
        p = 100;
      }
      if(p<0){
        p = 0;
      }
      this.shadowRoot.querySelector(".progress-bar").style.width = p + "%";
      this.shadowRoot.querySelector("span.status .percentage").innerHTML = p + "%";
      this.shadowRoot.querySelector("span.status .value").innerHTML = this.value;
    }
  });

  booleanAttrs.map(function (v,i) {
    var Prop = {};
    Prop[v] = {
      get : function () {
        return this.getBooleanAttribute(v);
      },
      set : function (newVal) {
        this.setBooleanAttribute(v, newVal);
      }
    };
    Object.defineProperties(BrickProgressbarElementPrototype, Prop);
  });

  integerAttrs.map(function (v,i) {
    var Prop = {};
    Prop[v] = {
      get : function () {
        return this.getIntegerAttribute(v);
      },
      set : function (newVal) {
        this.setIntegerAttribute(v, newVal);
      }
    };
    Object.defineProperties(BrickProgressbarElementPrototype, Prop);
  });

  Object.defineProperties(BrickProgressbarElementPrototype, {
    'type': {
      get : function () {
        var val = this.getAttribute('type');
        if(val !== null){
          return val;
        }else{
          return defaultOptions.type;
        }
      },
      set : function (newVal) {
        if (this.type !== newVal) {
          if(progressBarTypes.indexOf(newVal) !== -1){
            this.setAttribute('type', newVal);
          }
        }
      }
    }
  });

  // Register the element

  window.BrickProgressbarElement = document.registerElement('brick-progressbar', {
    prototype: BrickProgressbarElementPrototype
  });

})();