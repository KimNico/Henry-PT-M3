'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor){
    this._state= 'pending'
    this._value = undefined
    if(typeof executor !== "function")throw new TypeError("executor is not a function")
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._internalResolve = function(value){
    if(this._state==='pending'){
        this._state = 'fulfilled'
        this._value= value
        this._callHandlers()
    }
    
}

$Promise.prototype._internalReject = function(value){
    if(this._state==='pending'){
        this._state = 'rejected'
        this._value= value
        this._callHandlers()
    }
}

$Promise.prototype._callHandlers=function(){
    while(this._handleGroups.length>0){
        const cb = this._handleGroups.shift();
        if(this._state === 'fulfilled'){
            if(cb.successCb){
                try {
                    const result = cb.successCb(this._value);
                    if(result instanceof $Promise){
                        return result.then(
                        (value)=>{
                            return cb.downStreamPromise._internalResolve(value)
                        },
                        (error)=>{
                            return cb.downStreamPromise._internalReject(value)
                        }
                        )
                    }else{
                    cb.downStreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    cb.downStreamPromise._internalReject(error)
                }
            }else{
                return cb.downStreamPromise._internalResolve(this._value)
            }
        }else if(this._state === 'rejected'){
            if(cb.successCb){
                try {
                    const result = cb.successCb(this._value);
                    if(result instanceof $Promise){
                        return result.then(
                        (value)=>{
                            return cb.downStreamPromise._internalResolve(value)
                        },
                        (error)=>{
                            return cb.downStreamPromise._internalReject(value)
                        }
                        )
                    }else{
                    cb.downStreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    cb.downStreamPromise._internalReject(error)
                }
            }else{
                return cb.downStreamPromise._internalReject(this._value)
            }
        }

    }
}
$Promise.prototype.then = function(){
    if(typeof successCb !== 'function')SuccessCb=false;
    if(typeof errorCb !== 'function') errorCb=false

    const downStreamPromise = new $Promise(()=>{})

    this._handleGroups.push({
        successCb,
        errorCb,
        downStreamPromise
    })

    if(this._state !== 'pending') this._callHandlers();
    return downStreamPromise
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
