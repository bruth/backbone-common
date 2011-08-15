# Usage:
# 
# Extend either the collection or model class to have polling on
# initialization. Override the ``pollInterval`` property to adjust the
# time between polls. Override the ``poll`` method to customize the
# behavior of the poll.

define ['common/utils'], (utils) ->

    Mixin =
        pollInterval: 1000 * 30
        initialize: -> @startPolling()
        startPolling: -> @_pollInterval = setInterval (=> @poll()), @pollInterval
        stopPolling: -> clearTimeout @_pollInterval
        poll: -> @fetch()

    class PollingModel extends Backbone.Model
    class PollingCollection extends Backbone.Collection

    utils.include PollingModel, Mixin
    utils.include PollingCollection, Mixin

    return {
        Model: PollingModel
        Collection: PollingCollection
    }
