(function () {
  var currentScript = document._currentScript || document.currentScript;

  var boolStringToBoolean = {
    "true": true,
    "false": false
  };

  var BrickProgressbarElementPrototype = Object.create(HTMLElement.prototype);

  // Lifecycle methods

  BrickProgressbarElementPrototype.createdCallback = function () {

  };

  BrickProgressbarElementPrototype.attachedCallback = function () {

    var importDoc = currentScript.ownerDocument;
    var template = importDoc.querySelector('#brick-progressbar-template');

    var shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.options = {};


    if(this.getAttribute("min") !== null){
      this.options.min = parseInt(this.getAttribute("min"), 10);
    }else{
      this.options.min = 0;
    }

    if(this.getAttribute("max") !== null){
      this.options.max = parseInt(this.getAttribute("max"), 10);
    }else{
      this.options.max = 100;
    }

    if(this.getAttribute("type") !== null){
      this.setProgressType(this.getAttribute("type"));
    }else{
      this.options.type = "default";
    }

    if(this.getAttribute("showPercentage") !== null){
      this.options.showPercentage = boolStringToBoolean[this.getAttribute("showPercentage")];
    }else{
      this.options.showPercentage = true;
    }

    if(this.active !== null){
     this.active = true;
    }

    if(this.striped !== null){
      this.striped = true;
    }

    if(this.value !== null){
      this.value = parseInt(this.value, 10);
    }else{
      this.value = this.options.min;
    }
  };

  BrickProgressbarElementPrototype.detachedCallback = function () {

  };

  BrickProgressbarElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attr in attrs) {
      attrs[attr].call(this, oldVal, newVal);
    }
  };

  // Custom methods

  BrickProgressbarElementPrototype.foo = function () {

  };

  // Attribute handlers

  var attrs = {
    'value': function (oldVal, newVal) {
      this.setAttribute('value', newVal);
    }
  };

  // Property handlers

  BrickProgressbarElementPrototype.setProgressStatus = function () {
    var newVal = parseInt(this.getAttribute('value'), 10);
    var p = ((newVal - this.options.min)/(this.options.max -this.options.min) * 100);
    if(p>100){
      p = 100;
    }
    if(p<0){
      p = 0;
    }
    this.shadowRoot.querySelector(".progress-bar").style.width = p + "%";
    if(this.options.showPercentage){
      this.shadowRoot.querySelector(".status").innerHTML = p + "%";
    }else{
      this.shadowRoot.querySelector(".status").innerHTML = newVal;
    }

  };

  BrickProgressbarElementPrototype.setProgressType = function (newVal) {
    if(this.options.type === newVal){
      return;
    }
    if(newVal === "success" || newVal === "info" || newVal === "warning" || newVal === "danger" || newVal === "default"){
      var node = this.shadowRoot.querySelector(".progress-bar");
      if(this.options.type === "success" || this.options.type === "info" || this.options.type === "warning" || this.options.type === "danger"){
        node.classList.remove("progress-bar-" + this.options.type);
      }
      this.options.type = newVal;
      if(newVal !== "default"){
        node.classList.add("progress-bar-" + this.options.type);
      }
    }else{
      console.error("Trying to set invalid value to type");
    }
  };

  Object.defineProperties(BrickProgressbarElementPrototype, {
    'value': {
      get : function () {
        return this.getAttribute('value');

      },
      set : function (newVal) {
        // update the attribute if needed.
        if (this.getAttribute('value') !== newVal) {
          this.setAttribute('value', newVal);
          this.setProgressStatus();
        }
      }
    },
    'active': {
      get : function () {
        return this.getAttribute('active');

      },
      set : function (newVal) {
        // update the attribute if needed.
        if (this.getAttribute('active') !== newVal) {
          this.setAttribute('active', newVal);
          if(newVal === true){
            this.shadowRoot.querySelector(".progress-bar").classList.add("active");
          }else{
            this.shadowRoot.querySelector(".progress-bar").classList.remove("active");
          }

        }
      }
    },
    'striped': {
      get : function () {
        return this.getAttribute('striped');
      },
      set : function (newVal) {
        // update the attribute if needed.
        if (this.getAttribute('striped') !== newVal) {
          this.setAttribute('striped', newVal);
          if(newVal === true){
            this.shadowRoot.querySelector(".progress-bar").classList.add("progress-bar-striped");
          }else{
            this.shadowRoot.querySelector(".progress-bar").classList.remove("progress-bar-striped");
          }
        }
      }
    },
    'min': {
      get : function () {
        return this.options.min;
      },
      set : function (newVal) {
        this.options.min = newVal;
      }
    },
    'max': {
      get : function () {
        return this.options.max;
      },
      set : function (newVal) {
        this.options.max = newVal;
      }
    },
    'showPercentage': {
      get : function () {
        return this.options.showPercentage;
      },
      set : function (newVal) {
        if(typeof newVal === "boolean" ){
          this.options.showPercentage = newVal;
          //Display value using new flag !
          this.setProgressStatus();
        }else{
          console.error("Trying to set non-boolean value to showPercentage");
        }
      }
    },
    'type': {
      get : function () {
        return this.options.type;
      },
      set : function (newVal) {
        this.setProgressType(newVal);
      }
    }
  });

  // Register the element

  window.BrickProgressbarElement = document.registerElement('brick-progressbar', {
    prototype: BrickProgressbarElementPrototype
  });

})();