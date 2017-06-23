//
//

var menuItemStyle={
  display:"block",
}

var markedMenuItemStyle={
  display:"block",
  color:"red"
}

var ulStyle={
  display:"inline-block",
  padding:"0 20px"
}



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
<<<<<<< HEAD
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

      this.props.submitOrders({
        sum:sum,
        finished:false
=======
        'dishes':this.state.dishes
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8
      });
    },

    render: function() {
      var that=this;
<<<<<<< HEAD

=======
      console.log('render');
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8

        var unselectedDishesArr = this.state.dishes.map(function(dishes,index) {
          if(dishes.selected){
            return;
          }
          var markedStyle=dishes.marked?markedMenuItemStyle:menuItemStyle;
            return <li onClick = {that.ChangeMarkedDishes.bind(that,index,'unselected')}
            style={dishes.marked?markedMenuItemStyle:menuItemStyle}
            >{dishes.name}</li>
            ;
        });


        var selectedDishesArr = this.state.dishes.map(function(dishes,index){
          if(!dishes.selected){
            return;
          }
          var markedStyle=dishes.marked?markedMenuItemStyle:menuItemStyle;
            return <li onClick = {that.ChangeMarkedDishes.bind(that,index,'selected')}
            style={dishes.marked?markedMenuItemStyle:menuItemStyle}
            >{dishes.name}</li>
            ;
        });



        return <div>
              <ul style={ulStyle}>{unselectedDishesArr}</ul>
              <button onClick={this.addSelectedDishes}>add</button>
              <button onClick={this.removeSelectedDishes}>remove</button>
              <ul style={ulStyle}>{selectedDishesArr}</ul>
<<<<<<< HEAD
              <button onClick={this.submitOrders}>submit</button>
=======
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8
              </div>
              ;


    }



});


<<<<<<< HEAD
var Counter=React.createClass({
  getInitialState:function(){
    return {
      childMsg:"here the child"
    };
  },


  render:function(){

    ;
    var orders=this.orders=this.state.orders=this.props.orders;


    return <div>

            <ul>
            <li>Sum</li>
            <li>Status</li>
            </ul>

            <ul>
            <li onClick={this.sumAsd}>ascending</li>
            <li onClick={this.sumDsd}>descending</li>
            <li onClick={this.statusAsd}>ascending</li>
            <li onClick={this.statusDsd}>descending</li>
            </ul>


            </div>

  }
});


=======
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8




var Hall = React.createClass({

  getInitialState: function() {
<<<<<<< HEAD
    return {
      orders:[]
    };
  },
submitOrders:function(obj){
  this.state.orders.push(obj);

  console.log(this.state.orders);

  this.setState({
    orders:this.state.orders
  });
},
=======
    return {hall: 1};
  },
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8

  render: function() {

    return <div>
          <span>hall</span>
<<<<<<< HEAD
          <Menu submitOrders={this.submitOrders.bind(this)} />
          <Counter orders={this.state.orders} />
=======
          <Menu />
>>>>>>> 5aee51f4ff43936bce0b8dde07cd508de685eed8
          </div>
    ;
  }

});

var Kitchen = React.createClass({
  getInitialState: function() {
    return {kitchen: 1}
  },

  render: function() {

    return <span>kitchen</span>
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
