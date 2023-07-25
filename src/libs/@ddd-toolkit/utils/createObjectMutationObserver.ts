export function createObjectMutationObserver<O extends object>(prevObj: O, params: {
    onMutation?: (obj: O) => void,
}) {
    const createNextObj = () => new Proxy(prevObj, handler());

    function handler(): ProxyHandler<O> {
        return {
            get: function (target, prop) {
                const value = target[prop];
                const valueType = Object.prototype.toString.call(value);
                const isObject = ['[object Object]', '[object Array]'].includes(valueType);

                if (isObject) {
                    return new Proxy(value, handler());
                }
    
                return value;
            },
            set: function (target, prop, value) {
                target[prop] = value;
    
                if (params.onMutation) {
                    const nextObj = createNextObj();
                    params.onMutation(nextObj)
                }
    
                return true;
            }
        };
    };

    return createNextObj();
}