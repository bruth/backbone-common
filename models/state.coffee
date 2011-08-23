# Usage:
# 
# In this context, a model acts as a single state within a state machine.
# When and how states become active is dependent on the implementation of
# state manager. For example, a typical tabs state machine only allows a
# single tab to be _active_ at any given time.
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
# The public methods ``enable``, ``disable``, ``activate``, and ``inactivate``
# should be used when changing it's state.

define ->

    class StateModel extends Backbone.Model
        defaults:
            _active: false
            _enabled: true

        initialize: ->
            @bind 'change:_active', @_changeActive
            @bind 'change:_enabled', @_changeEnabled

        toJSON: ->
            attrs = super
            delete attrs['_active']
            delete attrs['_enabled']
            attrs

        _changeActive: (model, active) ->
            event = if active then 'active' else 'inactive'
            @model.trigger event, @

        _changeEnabled: (model, enabled) ->
            event = if enabled then 'enabled' else 'disabled'
            @model.trigger event, @

        enable: -> @set('_enabled', true)
        disable: -> @set('_enabled', false)

        activate: -> if @get('_enabled') then @set('_active', true)
        inactivate: -> if @get('_enabled') then @set('_active', false)

        isEnabled: -> @get('_enabled')
        isActive: -> @get('_enabled') and @get('_active')

    return Model: StateModel
