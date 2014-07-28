(function () {

  var BrickProgressbarElementPrototype = Object.create(HTMLElement.prototype);

  // Lifecycle methods

  BrickProgressbarElementPrototype.createdCallback = function () {

  };

  BrickProgressbarElementPrototype.attachedCallback = function () {
    this.innerHTML = [
    '<div class="progress">',
      '<div class="progress-bar" role="progressbar">',
        '<span class="status"></span>',
      '</div>',
    '</div>'].join("");

    if(this.active !== null){
     this.active = true;
    }
    if(this.striped !== null){
      this.striped = true;
    }

    if(this.value !== null){
      this.value = parseInt(this.value, 10);
    }else{
      this.value = 0;
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
            this.querySelector(".progress-bar").classList.add("progress-bar-striped");
          }else{
            this.querySelector(".progress-bar").classList.remove("progress-bar-striped");
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