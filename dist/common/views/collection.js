var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['backbone', 'common/utils'], function(Backbone, utils) {
  var CollectionView, ExpandableListMixin, ExpandableListView;
  CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      this.update = __bind(this.update, this);
      this.destroy = __bind(this.destroy, this);
      this.remove = __bind(this.remove, this);
      this.reset = __bind(this.reset, this);
      this.add = __bind(this.add, this);
      this.all = __bind(this.all, this);
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.viewClass = Backbone.View;

    CollectionView.prototype.defaultContent = null;

    CollectionView.prototype.initialize = function() {
      this.childViews = {};
      this.collection.bind('add', this.add);
      this.collection.bind('reset', this.reset);
      this.collection.bind('remove', this.remove);
      this.collection.bind('destroy', this.destroy);
      this.collection.bind('change', this.update);
      if (this.defaultContent) {
        this.collection.bind('all', this.all);
        this.defaultContent = this.$(this.defaultContent).detach();
        return this.el.append(this.defaultContent);
      }
    };

    CollectionView.prototype.insertChild = function(view) {
      return this.el.append(view.el);
    };

    CollectionView.prototype.all = function() {
      if (this.collection.length) {
        return this.defaultContent.hide();
      } else {
        return this.defaultContent.show();
      }
    };

    CollectionView.prototype.add = function(model) {
      var view;
      if ((view = this.childViews[model.id || model.cid])) {
        clearTimeout(view._destroyTimer);
      } else {
        view = this.childViews[model.id || model.cid] = (new this.viewClass({
          model: model
        })).render();
        this.insertChild(view);
      }
      return view;
    };

    CollectionView.prototype.reset = function(collection, options) {
      return collection.each(this.add);
    };

    CollectionView.prototype.remove = function(model) {
      var view,
        _this = this;
      view = this.childViews[model.id || model.cid];
      view.el.detach();
      return view._destroyTimer = setTimeout(function() {
        return _this.destroy(model);
      }, 1000 * 10);
    };

    CollectionView.prototype.destroy = function(model) {
      return this.childViews[model.id || model.cid].el.remove();
    };

    CollectionView.prototype.update = function(model) {
      var view;
      view = this.childViews[model.id || model.cid];
      if (!view && (view = this.childViews[model.cid])) {
        this.childViews[model.id] = view;
        delete this.childViews[model.cid];
      }
      return view.render();
    };

    return CollectionView;

  })(Backbone.View);
  ExpandableListMixin = {
    collapsedLength: 5,
    getItems: function() {
      return this.el.children();
    },
    getHiddenItems: function() {
      return this.getItems().filter(":gt(" + (this.collapsedLength - 1) + ")");
    },
    getExpanderText: function() {
      return "Show " + (this.getHiddenItems().length) + " more..";
    },
    renderExpander: function() {
      var _this = this;
      this.expander = this.$('<a class="expand-list" href="#">' + this.getExpanderText() + '</a>').bind('click', function() {
        _this.expand();
        return false;
      });
      return this.el.after(this.expander);
    },
    expand: function() {
      this.getHiddenItems().show();
      return this.expander.remove();
    },
    collapse: function() {
      if (this.expander) this.expander.remove();
      if (this.getItems().length > this.collapsedLength) {
        this.getHiddenItems().hide();
        return this.renderExpander();
      }
    }
  };
  ExpandableListView = (function(_super) {

    __extends(ExpandableListView, _super);

    function ExpandableListView() {
      ExpandableListView.__super__.constructor.apply(this, arguments);
    }

    return ExpandableListView;

  })(Backbone.View);
  utils.include(ExpandableListView, ExpandableListMixin);
  return {
    View: CollectionView,
    ExpandableListMixin: ExpandableListMixin,
    ExpandableList: ExpandableListView
  };
});
