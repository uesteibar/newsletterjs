//Create the database service to manage data storage.

newsletterjs.factory('database', function ($window, $q) {
    var indexedDB = $window.indexedDB;
    var db = null;
    var lastIndexEmail = 0;
    var lastIndexAccount = 0;
    var lastIndexEmailList = 0;

    var open = function () {
        var deferred = $q.defer();
        var version = 21;
        var request = indexedDB.open("newsletterjs", version);

        request.onupgradeneeded = function (e) {
            db = e.target.result;
            console.log("newsletterjs IndexedDB started");
            e.target.transaction.onerror = indexedDB.onerror;

            //EMAILS STORE
            if (db.objectStoreNames.contains("email")) {
                db.deleteObjectStore("email");
            }

            var store = db.createObjectStore("email", {
                keyPath: "id"
            });

            //ACCOUNTS STORE
            if (db.objectStoreNames.contains("account")) {
                db.deleteObjectStore("account");
            }

            var accountStore = db.createObjectStore("account", {
                keyPath: "id"
            });

            //EMAIL LISTS STORE
            if (db.objectStoreNames.contains("emaillist")) {
                db.deleteObjectStore("emaillist");
            }

            var accountStore = db.createObjectStore("emaillist", {
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
            email.date = new Date();

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
    
    // USERS CRUD //

    var saveAccount = function (account) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["account"], "readwrite");
            var store = trans.objectStore("account");
            lastIndexAccount++;
            account.id = lastIndexAccount;

            var request = store.put(account);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Account item couldn't be added!");
            };
        }
        return deferred.promise;
    };
   
    var getAccounts = function () {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["account"], "readwrite");
            var store = trans.objectStore("account");
            var accounts = [];

            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function (e) {
                var result = e.target.result;
                if (result === null || result === undefined) {
                    deferred.resolve(accounts);
                } else {
                    accounts.push(result.value);
                    if (result.value.id > lastIndexAccount) {
                        lastIndexAccount= result.value.id;
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

    var deleteAccount = function (id) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["account"], "readwrite");
            var store = trans.objectStore("account");

            var request = store.delete(id);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Account item couldn't be deleted");
            };
        }

        return deferred.promise;
    };

    //END OF ACCOUNTS CRUD


    // EMAIL LISTS CRUD


    var saveEmailList = function (EmailList) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["emaillist"], "readwrite");
            var store = trans.objectStore("emaillist");
            lastIndexEmailList++;
            EmailList.id = lastIndexEmailList;

            var request = store.put(EmailList);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Email list item couldn't be added!");
            };
        }
        return deferred.promise;
    };


    var getEmailLists = function () {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["emaillist"], "readwrite");
            var store = trans.objectStore("emaillist");
            var emaillists = [];

            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function (e) {
                var result = e.target.result;
                if (result === null || result === undefined) {
                    deferred.resolve(emaillists);
                } else {
                    emaillists.push(result.value);
                    if (result.value.id > lastIndexEmailList) {
                        lastIndexEmailList= result.value.id;
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


var updateEmailList = function (id, emaillist) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["emaillist"], "readwrite");
            var store = trans.objectStore("emaillist");

            var getrequest = store.get(id);

            getrequest.onsuccess = function (e) {
                getrequest.result = emaillist;


                var request = store.put(getrequest.result);

                request.onsuccess = function (e) {
                    deferred.resolve();
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Email list item couldn't be updated!");
                };

            }
        }
        return deferred.promise;

    };

var deleteEmailList = function (id) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction(["emaillist"], "readwrite");
            var store = trans.objectStore("emaillist");

            var request = store.delete(id);

            request.onsuccess = function (e) {
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Email list item couldn't be deleted");
            };
        }

        return deferred.promise;
    };

    //END OF EMAIL LISTS CRUD
    
    
    
    
    return {
        open: open,
        getEmails: getEmails,
        saveEmail: saveEmail,
        deleteEmail: deleteEmail,
        updateEmail: updateEmail,

        getAccounts: getAccounts,
        saveAccount: saveAccount,
        deleteAccount: deleteAccount,

        getEmailLists: getEmailLists,
        saveEmailList: saveEmailList,
        deleteEmailList: deleteEmailList,
        updateEmailList: updateEmailList
    };

});