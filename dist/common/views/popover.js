var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var PopoverView, locations;
  locations = {
    right: function(reference, target) {
      var rHeight, rOffset, rWidth, tHeight;
      tHeight = target.outerHeight();
      rOffset = reference.offset();
      rHeight = reference.outerHeight();
      rWidth = reference.outerWidth();
      return target.animate({
        top: rOffset.top - (tHeight - rHeight) / 2.0,
        left: rOffset.left + rWidth + 5.0
      }, 300, 'easeOutQuint');
    },
    left: function(reference, target) {
      var rHeight, rOffset, tHeight, tWidth;
      tHeight = target.outerHeight();
      tWidth = target.outerWidth();
      rOffset = reference.offset();
      rHeight = reference.outerHeight();
      return target.animate({
        top: rOffset.top - (tHeight - rHeight) / 2.0,
        left: rOffset.left - tWidth - 5.0
      }, 300, 'easeOutQuint');
    },
    above: function(reference, target) {
      var rOffset, rWidth, tHeight, tWidth;
      tHeight = target.outerHeight();
      tWidth = target.outerWidth();
      rOffset = reference.offset();
      rWidth = reference.outerWidth();
      return target.animate({
        top: rOffset.top - tHeight - 5.0,
        left: rOffset.left - (tWidth - rWidth) / 2.0
      }, 300, 'easeOutQuint');
    },
    below: function(reference, target) {
      var rHeight, rOffset, rWidth, tWidth;
      tWidth = target.outerWidth();
      rOffset = reference.offset();
      rHeight = reference.outerHeight();
      rWidth = reference.outerWidth();
      return target.animate({
        top: rOffset.top + rHeight + 5.0,
        left: rOffset.left - (tWidth - rWidth) / 2.0
      }, 300, 'easeOutQuint');
    }
  };
  PopoverView = (function(_super) {

    __extends(PopoverView, _super);

    function PopoverView() {
      PopoverView.__super__.constructor.apply(this, arguments);
    }

    PopoverView.prototype.location = 'right';

    PopoverView.prototype.events = {
      'mouseenter': 'mouseenter',
      'mouseleave': 'mouseleave'
    };

    PopoverView.prototype.elements = {
      '.title': 'title',
      '.content': 'content'
    };

    PopoverView.prototype.update = function(view) {};

    PopoverView.prototype.show = function(view, location) {
      var _this = this;
      if (location == null) location = this.location;
      this.clear();
      return this.delay(function() {
        _this.update(view);
        _this.el.removeClass('right left above below').addClass(location);
        locations[location](view.el, _this.el);
        return _this.el.fadeIn('fast');
      }, 300);
    };

    PopoverView.prototype.hide = function(immediately) {
      var _this = this;
      if (immediately == null) immediately = false;
      this.clear();
      if (immediately) {
        return this.el.hide();
      } else if (!this.entered) {
        return this.delay(function() {
          return _this.el.hide();
        }, 100);
      }
    };

    PopoverView.prototype.mouseenter = function() {
      this.entered = true;
      return this.clear();
    };

    PopoverView.prototype.mouseleave = function() {
      this.entered = false;
      return this.hide();
    };

    PopoverView.prototype.delay = function(func, delay) {
      return this._hoverTimer = setTimeout(func, delay);
    };

    PopoverView.prototype.clear = function() {
      clearTimeout(this._hoverTimer);
      return this.el.clearQueue();
    };

    return PopoverView;

  })(Backbone.View);
  return {
    Popover: PopoverView
  };
});
