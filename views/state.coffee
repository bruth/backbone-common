# Usage:
# 
# A simple view which listens for various state change events from it's
# representing model. In this context, a model acts as a single state within
# a state machine. When and how states become active is dependent on the
# implementation of state manager. For example, a typical tabs state machine
# only allows a single tab to be _active_ at any given time.
#
# Supported events:
#
#   ``active`` - denotes the state has become active
#   ``inactive`` - denotes the state has become inactive 
#   ``enabled`` - denotes the state has become enabled
#   ``disabled`` - denotes the state has become disabled
#
# ``enabled/disabled`` differs, in that is represents whether a state is
# available to be transitioned to. If a state is ``disabled``, it can be
# thought of being temporarily removed from the state machine. It cannot
# become ``active`` or ``inactive`` while in this state until is ``enabled``.
#
# Any of the methods can be overriden to reflect the appropriate UI change
# for each state change.

define ->
    class StateView extends Backbone.View
        initialize: ->
            @model.bind 'active', @activate
            @model.bind 'inactive', @inactivate
            @model.bind 'enabled', @enable
            @model.bind 'disabled', @disable

        activate: => @el.addClass 'active'
        inactivate: => @el.removeClass 'active'
        enable: => @el.show()
        disable: => @el.hide()

    return View: StateView
