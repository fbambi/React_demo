/*

        counstructor

  Hall            Kitchen
  --Menu          --kitchen
  --Counter

*/

/*********Style Start*********/
var liItemStyle = {
    display: "block",
    cursor: "pointer"
}

var markedLiItemStyle = {
    display: "block",
    cursor: "pointer",
    color: "red"
}

var ulStyle = {
    display: "inline-block",
    padding: "0 20px"
}

var sortStyle = {
    display: "inline-block",
    margin: "10px",
    fontSize: "8px",
    cursor: "pointer"
};

var counterHeaderStyle = {
    display: "inline-block",
    width: "170px",
    textAlign: "center"
};
/*********Style End*********/

// Menu
var Menu = React.createClass({
    getInitialState: function() {
        return {
            dishes: [
                {
                    name: 'dishes1',
                    selected: false,
                    marked: false
                }, {
                    name: 'dishes2',
                    selected: false,
                    marked: false
                }, {
                    name: 'dishes3',
                    selected: false,
                    marked: false
                }, {
                    name: 'dishes4',
                    selected: false,
                    marked: false
                }, {
                    name: 'dishes5',
                    selected: false,
                    marked: false
                }, {
                    name: 'dishes6',
                    selected: true,
                    marked: false
                }, {
                    name: 'dishes7',
                    selected: true,
                    marked: false
                }, {
                    name: 'dishes8',
                    selected: true,
                    marked: false
                }
            ]
        };
    },

    addSelectedDishes: function() {
        var dishes = this.state.dishes;
        dishes.forEach(function(element) {
            if ((!element.selected) && element.marked) {
                element.selected = true;
                element.marked = false;
            }
        });
        this.setState({'dishes': this.state.dishes});

    },

    removeSelectedDishes: function() {
        var dishes = this.state.dishes;
        dishes.forEach(function(element) {
            if (element.selected && element.marked) {
                element.selected = false;
                element.marked = false;
            }
        });
        this.setState({'dishes': this.state.dishes});
    },

    ChangeMarkedDishes: function(index, status) {

        var dishes = this.state.dishes[index];
        dishes.marked = !dishes.marked;

        // this.state.dishes.forEach(function(element){
        //   console.log(element.name,element.markedUnselected?'marked':'unmarked');
        // });
        this.setState({dishes: this.state.dishes});
    },

    submitOrders: function() {

        var dishes = this.state.dishes;
        var sum = 0;

        dishes.forEach(function(el) {
            if (el.selected) {
                sum += parseInt((Math.random() * (150 - 20) + 20), 10);
            }
        });
        if (!sum) {
            return;
        }

        dishes.forEach(function(el) {
            el.selected = false;
            el.marked = false;
        });
        this.setState({dishes});

        this.props.receiveOrders({sum: sum, finished: false});
    },

    render: function() {
        var that = this;

        var unselectedDishesArr = this.state.dishes.map(function(dishes, index) {

            if (dishes.selected) {
                return;
            }

            return (
                <li style={dishes.marked
                    ? markedLiItemStyle
                    : liItemStyle} onClick={that.ChangeMarkedDishes.bind(that, index, 'unselected')}>{dishes.name}</li>
            );
        });

        var selectedDishesArr = this.state.dishes.map(function(dishes, index) {
            if (!dishes.selected) {
                return;
            }

            return (
                <li style={dishes.marked
                    ? markedLiItemStyle
                    : liItemStyle} onClick={that.ChangeMarkedDishes.bind(that, index, 'selected')}>{dishes.name}</li>
            );
        });

        return (
            <div>
                <ul style={ulStyle}>{unselectedDishesArr}</ul>
                <ul style={ulStyle}>
                    <button style={{
                        display: "block",
                        margin: "10px 0"
                    }} onClick={this.addSelectedDishes}>add →</button>
                    <button style={{
                        display: "block"
                    }} onClick={this.removeSelectedDishes}>← remove</button>
                </ul>

                <ul style={ulStyle}>{selectedDishesArr}</ul>
                <button onClick={this.submitOrders}>submit</button>
            </div>
        );

    }

});

// Counter
var Counter = React.createClass({
    getInitialState: function() {
        return {orders: this.props.orders};
    },

    manualRender: function() {
        this.setState({orders: this.state.orders});
    },

    sortSumAsd: function() {
        this.state.orders.sort(function(a, b) {
            return a.sum - b.sum;
        });
        this.manualRender();
    },

    sortSumDsd: function() {
        this.state.orders.sort(function(a, b) {
            return b.sum - a.sum;
        });
        this.manualRender();
    },

    sortStatusFinished: function() {
        this.state.orders.sort(function(a, b) {
            if (a.finished !== b.finished) {
                return a.finished
                    ? -1
                    : 1;
            }
            return a.sum - b.sum;
        });
        this.manualRender();
    },

    sortStatusUnfinished: function() {
        this.state.orders.sort(function(a, b) {
            if (a.finished !== b.finished) {
                return a.finished
                    ? 1
                    : -1;
            }
            return a.sum - b.sum;
        });
        this.manualRender();
    },

    render: function() {

        var orders = this.state.orders;

        var ordersArr = orders.map(function(order) {
            return (
                <ul style={{
                    display: "block",
                    paddingLeft: "100px"
                }}>
                    <li style={counterHeaderStyle}>{order.sum}</li>
                    <li style={counterHeaderStyle}>{order.finished
                            ? "finished"
                            : "unfinished"}</li>
                </ul>
            );
        });


        return (
            <div>

                <ul style={{
                    display: "block",
                    paddingLeft: "100px"
                }}>
                    <li style={counterHeaderStyle}>Sum</li>
                    <li style={counterHeaderStyle}>Status</li>
                </ul>

                <ul style={{
                    display: "block"
                }}>
                    <li style={sortStyle}>
                        <b>Sort by</b>
                    </li>
                    <li style={sortStyle} onClick={this.sortSumAsd}>ascending ↑</li>
                    <li style={sortStyle} onClick={this.sortSumDsd}>descending ↓</li>
                    <li style={sortStyle} onClick={this.sortStatusFinished}>finished</li>
                    <li style={sortStyle} onClick={this.sortStatusUnfinished}>unfinished</li>
                </ul>
                {ordersArr}
            </div>
        );

    }
});

// Hall
var Hall = React.createClass({

    getInitialState: function() {
        var originalOrders = [
            {
                sum: 170,
                finished: false
            }, {
                sum: 266,
                finished: true
            }, {
                sum: 60,
                finished: true
            }, {
                sum: 120,
                finished: false
            }, {
                sum: 240,
                finished: true
            }, {
                sum: 546,
                finished: false
            }
        ];

        originalOrders = store.getState()
            ? store.getState().orders
            : originalOrders;

        store.dispatch(addOrderUpdate(originalOrders));

        return {orders: originalOrders};
    },

    receiveOrders: function(obj) {

        var orders = this.state.orders;

        orders.unshift(obj);
        this.setState({orders: orders});
        store.dispatch(addOrderUpdate(orders));

    },

    render: function() {

        return (
            <div>
                <h2>hall</h2>
                <h3 style={{
                    marginTop: "30px"
                }}>
                    <em>--------- Menu ---------</em>
                </h3>
                <Menu receiveOrders={this.receiveOrders}/>
                <h3 style={{
                    marginTop: "50px"
                }}>
                    <em>--------- Counter ---------</em>
                </h3>
                <Counter orders={this.state.orders}/>
            </div>
        );
    }

});

// Kitcchen
var Kitchen = React.createClass({
    getInitialState: function() {
        var originalOrders = store.getState();

        if ((!originalOrders) || originalOrders.orders.length === 0) {
            return {orders: []}
        }

        return {orders: originalOrders.orders}

    },

    handleCooking: function(index) {

        this.state.orders[index].finished = true;
        store.dispatch(addOrderUpdate(this.state.orders));
        this.setState({orders: this.state.orders});
    },

    render: function() {
        var that = this;
        var orders = this.state.orders;

        var unfinishedOrders = orders.map(function(order, index) {
            if (order.finished) {
                return;
            }
            return (
                <ul style={{
                    display: "block"
                }}>
                    <li style={counterHeaderStyle}>{order.sum}</li>
                    <button onClick={that.handleCooking.bind(that, index)}>Cooking</button>
                </ul>
            );
        });

        var isEmpty = unfinishedOrders.every(function(el) {
            return el === undefined
        });
        if (isEmpty) {
            return (
                <div>
                    <h2>kitchen</h2>
                    <h3>No orders now! Please &nbsp;
                        <Link to="/hall">
                            go back to order</Link>
                    </h3>
                </div>
            );

        }

        return (
            <div>
                <h2>kitchen</h2>
                {unfinishedOrders}
            </div>
        );
    }

});

var Router = ReactRouter;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Restaurant = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Welcome to Restaurant :D</h1>
                <Link to="/hall">Hall</Link>
                <br/>
                <Link to="/kitchen">Kitchen</Link>
                <RouteHandler/>

            </div>
        );
    }
});

/*********Redux Start*********/

// Action Creater
function addOrderUpdate(orders) {
    return {type: 'update', orders: orders}
}

// Reducer
var initialState = {
    orders: []
}
function updateOrders(state = initialState, action) {

    switch (action.type) {
        case 'update':
            return {
                orders: [...action.orders]
            }
    }
}

// Store
var store = Redux.createStore(updateOrders);

// var unsubscribe = store.subscribe(function() {
//     console.log('subscribe', store.getState().orders);
// });

var Provider = ReactRedux.Provider;

/*********Redux End*********/

/*********ReactRouter Start*********/

var routes = <Route path="/" handler={Restaurant}>
    <Route path="hall" handler={Hall}/>
    <Route path="kitchen" handler={Kitchen}/>
</Route>;

Router.run(routes, function(Handler, routerState) {
    ReactDOM.render(
        <Provider store={store}>
        <Handler routerState={routerState}/>
    </Provider>, document.body);
});

/*********ReactRouter End*********/
