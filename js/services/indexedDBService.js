//Create the database service to manage data storage.

newsletterjs.factory('database', function ($window, $q) {
    var indexedDB = $window.indexedDB;
    var db = null;
    var lastIndexEmail = 0;
    var lastIndexProject = 1;

    var open = function () {
        var deferred = $q.defer();
        var version = 0;
        var request = indexedDB.open("newspaperData", version);

        request.onupgradeneeded = function (e) {
            db = e.target.result;

            e.target.transaction.onerror = indexedDB.onerror;

            //EMAILS STORE
            if (db.objectStoreNames.contains("email")) {
                db.deleteObjectStore("email");
            }

            var store = db.createObjectStore("email", {
                keyPath: "id"
            });
            
            
            
        };

        request.onsuccess = function (e) {
            db = e.target.result;
            deferred.resolve();
        };

        request.onerror = function () {
            deferred.reject("An error occurs opening database");
        };

        return deferred.promise;
    };

    
    // EMAILS CRUD //
    var getEmails = function () {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["email"], "readwrite");
            var store = trans.objectStore("email");
            var emails = [];

            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function (e) {
                var result = e.target.result;
                if (result === null || result === undefined) {
                    deferred.resolve(emails);
                } else {
                    emails.push(result.value);
                    if (result.value.id > lastIndexEmail) {
                        lastIndexEmail= result.value.id;
                    }
                    result.continue();
                }
            };

            cursorRequest.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Something went wrong!!!");
            };
        }

        return deferred.promise;
    };

    var deleteEmail = function (id) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["email"], "readwrite");
            var store = trans.objectStore("email");

            var request = store.delete(id);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Email item couldn't be deleted");
            };
        }

        return deferred.promise;
    };

    var updateEmail = function (id, key, value) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["email"], "readwrite");
            var store = trans.objectStore("email");

            var getrequest = store.get(id);

            getrequest.onsuccess = function (e) {
                getrequest.result[key] = value;


                var request = store.put(getrequest.result);

                request.onsuccess = function (e) {
                    deferred.resolve();
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Email item couldn't be updated!");
                };

            }
        }
        return deferred.promise;

    };
    
    
    var saveEmail = function (email) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["email"], "readwrite");
            var store = trans.objectStore("email");
            lastIndexEmail++;
            email.id = lastIndexEmail;

            var request = store.put(email);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Email item couldn't be added!");
            };
        }
        return deferred.promise;
    };
    
    // END OF EMAILS CRUD //
    
    
   
    
    
    
    
    
    return {
        open: open,
        getEmails: getEmails,
        saveEmail: saveEmail,
        deleteEmail: deleteEmail,
        updateEmail: updateEmail
    };

});