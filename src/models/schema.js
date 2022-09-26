export const schema = {
    "models": {
        "List": {
            "name": "List",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "listName": {
                    "name": "listName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "listColor": {
                    "name": "listColor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ownerId": {
                    "name": "ownerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Lists",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Task": {
            "name": "Task",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "taskTitle": {
                    "name": "taskTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "isCompleted": {
                    "name": "isCompleted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "isImportant": {
                    "name": "isImportant",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ownerId": {
                    "name": "ownerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdOn": {
                    "name": "createdOn",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "updatedOn": {
                    "name": "updatedOn",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "listID": {
                    "name": "listID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "list": {
                    "name": "list",
                    "isArray": false,
                    "type": {
                        "model": "List"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "listID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Tasks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "timestamps": {
                            "createdAt": "createdOn",
                            "updatedAt": "updatedOn"
                        }
                    }
                }
            ]
        },
        "MyDay": {
            "name": "MyDay",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "myDayTitle": {
                    "name": "myDayTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ownerId": {
                    "name": "ownerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "isCompleted": {
                    "name": "isCompleted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "isImportant": {
                    "name": "isImportant",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdOn": {
                    "name": "createdOn",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "updatedOn": {
                    "name": "updatedOn",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "MyDays",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "timestamps": {
                            "createdAt": "createdOn",
                            "updatedAt": "updatedOn"
                        }
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "53046b293c01561cbe0209fbd78e65ac"
};