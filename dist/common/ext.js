
define(['backbone'], function(Backbone) {
  Backbone.Collection.prototype.sync = function(method, model, options) {
    options.beforeSend = function(xhr) {
      return model.trigger('request', model, xhr);
    };
    return Backbone.sync(method, model, options);
  };
  Backbone.Model.prototype.sync = function(method, model, options) {
    options.beforeSend = function(xhr) {
      return model.trigger('request', model, xhr);
    };
    return Backbone.sync(method, model, options);
  };
  Backbone.Collection.prototype.update = function(models, options) {
    var attrs, id, idAttr, ids, model, _i, _len;
    idAttr = this.model.idAttribute || Backbone.Model.prototype.idAttribute;
    ids = [];
    for (_i = 0, _len = models.length; _i < _len; _i++) {
      attrs = models[_i];
      id = attrs[idAttr];
      if ((model = this.get(id))) {
        model.set(attrs, options);
      } else {
        model = this.add(attrs, options);
      }
      if (options.prune) ids.push(id);
    }
    if (options.prune) this.remove(this.without(ids));
    this.trigger('update', this, options);
    return this;
  };
  return Backbone.Collection.prototype.fetch = function(options) {
    var collection, success;
    options = options ? _.clone(options) : {};
    if (options.parse === void 0) options.parse = true;
    collection = this;
    success = options.success;
    options.success = function(resp, status, xhr) {
      collection[options.update ? 'update' : options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
      if (success) return success(collection, resp);
    };
    options.error = Backbone.wrapError(options.error, collection, options);
    return (this.sync || Backbone.sync).call(this, 'read', this, options);
  };
});
