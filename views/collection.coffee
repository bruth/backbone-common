# Usage:
# 
# Extend and define a ``viewClass`` property which is the view class
# of the items within the collection. Each view is cached by their model's
# ``cid``.
    
define ->

    class CollectionView extends Backbone.View
        initialize: ->
            @childViews = {}
            @collection.bind 'add', @add
            @collection.bind 'reset', @reset
            @collection.bind 'remove', @remove
            @collection.bind 'destroy', @destroy

        add: (model) =>
            # the view for this model has already been rendered, simply
            # re-attach it to the DOM
            if model.cid in @childViews
                view = @childViews[model.cid]
                # clear destroy timer from stack
                clearTimeout view._removeTimer
            # create a new view representing this model
            else
                view = @childViews[model.cid] = (new @viewClass model: model).render()
            @el.append view.el

        # the collection has been reset, so create views for each new model
        reset: (collection, options) =>
            collection.each @add
            if options.initial then @el.animate opacity: 100, 500

        # detach the DOM element. this is intended to be temporary
        remove: (model) =>
            view = @childViews[model.cid]
            view.el.detach()
            # since this should be temporary, we set a timer to destroy the
            # element after some time to prevent memory leaks. note: this has no
            # impact on the underlying model
            view._removeTimer = setTimeout (=> @destroy), 1000 * 10

        # remove the DOM element and all bound data completely
        destroy: (model) => @childViews[model.cid].el.remove()


    return {
        View: CollectionView
    }
