(function () {

  var BrickProgressbarElementPrototype = Object.create(HTMLElement.prototype);

  // Lifecycle methods

  BrickProgressbarElementPrototype.createdCallback = function () {

  };

  BrickProgressbarElementPrototype.attachedCallback = function () {
    this.innerHTML = '<div class="progress">\
    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%">\
      <span class="status">0%</span>\
      </div>\
    </div>';
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
      //ToDO what is this ??
    }
  };

  // Property handlers

  Object.defineProperties(BrickProgressbarElementPrototype, {
    'value': {
      get : function () {
        return this.getAttribute('value');

      },
      set : function (newVal) {
        // update the attribute if needed.
        if (this.getAttribute('value') !== newVal) {
          this.setAttribute('value', newVal);
          this.querySelector(".progress-bar").style.width = newVal + "%";
          this.querySelector(".status").innerHTML = newVal + "%";
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
            this.querySelector(".progress-bar").classList.add("active");
          }else{
            this.querySelector(".progress-bar").classList.remove("active");
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