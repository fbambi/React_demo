//
//

var liItemStyle={
  display:"block",
  cursor:"pointer"
}

var markedLiItemStyle={
  display:"block",
  cursor:"pointer",
  color:"red"
}

var ulStyle={
  display:"inline-block",
  padding:"0 20px"
}

var sortStyle={
  display:"inline-block",
  margin:"10px",
  fontSize:"8px",
  cursor:"pointer"
};


var counterHeaderStyle={
  display:"inline-block",
  width:"170px",
  textAlign:"center"
};



var Menu = React.createClass({
    getInitialState: function() {
        return {
          dishes:[
            {
              name:'dishes1',
              selected:false,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes2',
              selected:false,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes3',
              selected:false,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes4',
              selected:false,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes5',
              selected:false,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes6',
              selected:true,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes7',
              selected:true,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
            {
              name:'dishes8',
              selected:true,
              markedSelected:false,
              markedUnselected:false,
              marked:false
            },
          ],



        }
    },

    addSelectedDishes: function() {
      var dishes = this.state.dishes;
      dishes.forEach(function(element){
        if((!element.selected)&&element.marked){
          element.selected=true;
          element.marked=false;
        }
      });
      this.setState({
        'dishes':this.state.dishes
      });

    },

    removeSelectedDishes:function(){
      var dishes = this.state.dishes;
      dishes.forEach(function(element){
        if(element.selected&&element.marked){
          element.selected=false;
          element.marked=false;
        }
      });
      this.setState({
        'dishes':this.state.dishes
      });
    },

    ChangeMarkedDishes:function(index,status){

      var dishes=this.state.dishes[index];
        dishes.marked=!dishes.marked;

      // this.state.dishes.forEach(function(element){
      //   console.log(element.name,element.markedUnselected?'marked':'unmarked');
      // });
      this.setState({
        dishes:this.state.dishes
      });
    },

    submitOrders:function(){

      var dishes = this.state.dishes;
      var sum=0;
      dishes.forEach(function(el){
        if(el.selected){
          sum+=parseInt((Math.random()*(150-20)+20),10);
        }
      });
      if(!sum){
        return;
      }
      dishes.forEach(function(el){
        el.selected=false;
        el.marked=false;
      });
      this.setState({
        dishes:dishes
      });

      this.props.receiveOrders({
        sum:sum,
        finished:false
      });
    },

    render: function() {
      var that=this;


        var unselectedDishesArr = this.state.dishes.map(function(dishes,index) {
          if(dishes.selected){
            return;
          }
          var markedStyle=dishes.marked?markedLiItemStyle:liItemStyle;
            return <li onClick = {that.ChangeMarkedDishes.bind(that,index,'unselected')}
            style={dishes.marked?markedLiItemStyle:liItemStyle}
            >{dishes.name}</li>
            ;
        });


        var selectedDishesArr = this.state.dishes.map(function(dishes,index){
          if(!dishes.selected){
            return;
          }
          var markedStyle=dishes.marked?markedLiItemStyle:liItemStyle;
            return <li onClick = {that.ChangeMarkedDishes.bind(that,index,'selected')}
            style={dishes.marked?markedLiItemStyle:liItemStyle}
            >{dishes.name}</li>
            ;
        });



        return <div>
              <ul style={ulStyle}>{unselectedDishesArr}</ul>
              <button onClick={this.addSelectedDishes}>add</button>
              <button onClick={this.removeSelectedDishes}>remove</button>
              <ul style={ulStyle}>{selectedDishesArr}</ul>
              <button onClick={this.submitOrders}>submit</button>
              </div>
              ;


    }



});


var Counter=React.createClass({
  getInitialState:function(){
    return {
      orders:[
        {sum:170,finished:false},
        {sum:266,finished:true},
        {sum:60,finished:true},
        {sum:120,finished:false},
        {sum:240,finished:true},
        {sum:546,finished:false},

      ]
    };
  },

  manualRender:function(){
    this.setState({
      orders:this.state.orders
    });
  },

  sumAsd:function(){
    this.state.orders.sort(function(a,b){
      return a.sum-b.sum;
    });
    this.manualRender();
  },

  sumDsd:function(){
    this.state.orders.sort(function(a,b){
      return b.sum-a.sum;
    });
    this.manualRender();
  },

  statusFinished:function(){
    this.state.orders.sort(function(a,b){
      if(a.finished!==b.finished){
        return a.finished?-1:1;
      }
      return a.sum-b.sum;
    });
    this.manualRender();
  },

  statusUnfinished:function(){
    this.state.orders.sort(function(a,b){
      if(a.finished!==b.finished){
        return a.finished?1:-1;
      }
      return a.sum-b.sum;
    });
    this.manualRender();
  },



  render:function(){

    var orders=this.state.orders||this.props.orders;
    this.state.orders=orders;

    window.orders=orders;

    orders=orders.map(function(order){
      return <ul style={{display:"block"}}>
              <li style={counterHeaderStyle}>{order.sum}</li>
              <li style={counterHeaderStyle}>{order.finished?"finished":"unfinished"}</li>
              </ul>
    });


    return <div>

            <ul style={{display:"block"}}>
            <li style={counterHeaderStyle}>Sum</li>
            <li style={counterHeaderStyle}>Status</li>
            </ul>

            <ul style={{display:"block"}}>
            <li style={sortStyle}
              onClick={this.sumAsd}>ascending ↑</li>
            <li style={sortStyle}
              onClick={this.sumDsd}>descending ↓</li>
            <li style={sortStyle}
              onClick={this.statusFinished}>finished</li>
            <li
            style={sortStyle}
              onClick={this.statusUnfinished}>unfinished</li>
            </ul>
            {orders}


            </div>

  }
});






var Hall = React.createClass({

  getInitialState: function() {
    return {
      orders:[]
    };
  },

  receiveOrders:function(obj){
    this.state.orders.unshift(obj);

    console.log(this.state.orders);

    this.setState({
      orders:this.state.orders
    });
  },

  render: function() {

    return <div>
          <span>hall</span>
          <Menu receiveOrders={this.receiveOrders.bind(this)} />
          <Counter orders={this.state.orders} />
          </div>
    ;
  }

});

var Kitchen = React.createClass({
  getInitialState: function() {
    return {kitchen: 1}
  },

  handleCooking:function(index){
    orders[index].finished=true;
    this.setState({
      orders:this.state.orders
    });
  },
  render: function() {

    var that=this;
    var orders=this.state.orders=window.orders;
    console.log(orders);

    var unfinishedOrders = orders.map(function(order,index){
      if(order.finished){
        return;
      }
      return <ul style={{display:"block"}}>
              <li style={counterHeaderStyle}>{order.sum}</li>
              <button onClick={that.handleCooking.bind(that,index)}>Cooking</button>
              </ul>
    });

    return <div>
            <span>kitchen</span>
            {unfinishedOrders}
            </div>
    ;
  }

});


ReactDOM.render(
  <Hall />,
  document.getElementById('hall')
);


ReactDOM.render(
  <Kitchen />,
  document.getElementById('kitchen')
);
