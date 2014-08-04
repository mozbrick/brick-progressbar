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
    toggle: function (attr) {
      //if(["active", "striped", "showStatus", "showactualvalue"].indexOf("attr") !== -1){
      // this[attr] = !this[attr];
      //}
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

  Object.defineProperties(BrickProgressbarElementPrototype, {
    'value': {
      get : function () {
        var val = this.getAttribute('value');
        if(val !== null){
          return parseInt(val, 10);
        }else{
          return defaultOptions.value;
        }
      },
      set : function (newVal) {
        if (this.value !== newVal) {
          if(typeof newVal === "number"){
            this.setAttribute('value', newVal);
            this.render();
          }
        }
      }
    },
    'min': {
      get : function () {
        var val = this.getAttribute('min');
        if(val !== null){
          return parseInt(val, 10);
        }else{
          return defaultOptions.min;
        }
      },
      set : function (newVal) {
        if (this.min !== newVal) {
          if(typeof newVal === "number"){
            this.setAttribute('min', newVal);
            this.render();
          }
        }
      }
    },
    'max': {
      get : function () {
        var val = this.getAttribute('max');
        if(val !== null){
          return parseInt(val, 10);
        }else{
          return defaultOptions.max;
        }
      },
      set : function (newVal) {
        if (this.max !== newVal) {
          if(typeof newVal === "number"){
            this.setAttribute('max', newVal);
            this.render();
          }
        }
      }
    },
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
          if(newVal === "success" || newVal === "info" || newVal === "warning" || newVal === "danger" || newVal === "default"){
            this.setAttribute('type', newVal);
          }
        }
      }
    },
    'active': {
      get : function () {
        return this.getBooleanAttribute("active");
      },
      set : function (newVal) {
        this.setBooleanAttribute("active", newVal);
      }
    },
    'striped': {
      get : function () {
        return this.getBooleanAttribute("striped");
      },
      set : function (newVal) {
        this.setBooleanAttribute("striped", newVal);
      }
    },
    'showactualvalue': {
      get : function () {
        return this.getBooleanAttribute("showactualvalue");
      },
      set : function (newVal) {
        this.setBooleanAttribute("showactualvalue", newVal);
      }
    },
    'showStatus': {
      get : function () {
        return this.getBooleanAttribute("showStatus");
      },
      set : function (newVal) {
        this.setBooleanAttribute("showStatus", newVal);
      }
    }
  });

  // Register the element

  window.BrickProgressbarElement = document.registerElement('brick-progressbar', {
    prototype: BrickProgressbarElementPrototype
  });

})();