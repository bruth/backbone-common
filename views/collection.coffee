# Usage:
# 
# Various list/collection-like view classes.
    
define ['common/utils'], (utils) ->

    # CollectionView
    # ==============
    # Robust view class for handling the various operations of a collection.
    # Manages adding, removing, reseting and destroying child views relative
    # to their ``model``.
    class CollectionView extends Backbone.View
        viewClass: Backbone.View

        initialize: ->
            @childViews = {}
            @collection.bind 'add', @add
            @collection.bind 'reset', @reset
            @collection.bind 'remove', @remove
            @collection.bind 'destroy', @destroy

        insertChild: (view) ->
            @el.append view.el

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
            @insertChild view

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
            view._removeTimer = setTimeout =>
                @destroy model
            , 1000 * 10

        # remove the DOM element and all bound data completely
        destroy: (model) => @childViews[model.cid].el.remove()


    # ExpandableListMixin
    # ===================
    # Provides an API for collapsing a list-like element. It handles rendering
    # an ``expander`` element when collapse is called. On each ``collapse()``
    # call, the ``expander`` is re-rendered to support dynamic changes to the
    # list. Suggested use: the end of the render method once all items are in
    # the list.
    #
    # This can be mixed in with any view class, use
    # ``utils.include(klass, mixin)``
    ExpandableListMixin =
        collapsedLength: 5

        getItems: -> @el.children()

        getHiddenItems: ->
             @getItems().filter ":gt(#{@collapsedLength-1})"

        getExpanderText: ->
            "Show #{@getHiddenItems().length} more.."

        renderExpander: ->
            @expander = $('<a class="expand" href="#">' + @getExpanderText() + '</a>')
                .bind 'click', =>
                    @expand()
                    return false
            @el.after @expander

        expand: ->
            @getHiddenItems().show()
            @expander.remove()

        collapse: ->
            if @expander then @expander.remove()
            if @getItems().length > @collapsedLength
                @getHiddenItems().hide()
                @renderExpander()


    # ExpandableListView
    # ==================
    # View class for ``ExpandableListMixin``
    class ExpandableListView extends Backbone.View

    utils.include ExpandableListView, ExpandableListMixin

    return {
        View: CollectionView
        ExpandableListMixin: ExpandableListMixin
        ExpandableList: ExpandableListView
    }
