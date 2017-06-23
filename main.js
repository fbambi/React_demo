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
        'dishes':this.state.dishes
      });
    },

    render: function() {
      var that=this;
      console.log('render');

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
              </div>
              ;


    }



});






var Hall = React.createClass({

  getInitialState: function() {
    return {hall: 1};
  },

  render: function() {

    return <div>
          <span>hall</span>
          <Menu />
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
