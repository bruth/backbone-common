var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['backbone', 'common/utils'], function(Backbone, utils) {
  var Mixin, PollingCollection, PollingModel;
  Mixin = {
    pollInterval: 1000 * 10,
    initialize: function() {
      return this.startPolling();
    },
    startPolling: function() {
      var _this = this;
      return this._pollInterval = setInterval((function() {
        return _this.poll();
      }), this.pollInterval);
    },
    stopPolling: function() {
      return clearTimeout(this._pollInterval);
    }
  };
  PollingModel = (function(_super) {

    __extends(PollingModel, _super);

    function PollingModel() {
      PollingModel.__super__.constructor.apply(this, arguments);
    }

    PollingModel.prototype.poll = function() {
      return this.fetch();
    };

    return PollingModel;

  })(Backbone.Model);
  PollingCollection = (function(_super) {

    __extends(PollingCollection, _super);

    function PollingCollection() {
      PollingCollection.__super__.constructor.apply(this, arguments);
    }

    PollingCollection.prototype.poll = function() {
      return this.fetch({
        update: true
      });
    };

    return PollingCollection;

  })(Backbone.Collection);
  utils.include(PollingModel, Mixin);
  utils.include(PollingCollection, Mixin);
  return {
    Model: PollingModel,
    Collection: PollingCollection
  };
});
