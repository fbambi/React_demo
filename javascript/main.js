//
//


var hall = React.createClass({

  getInitialState: function() {
    return {hall: 0};
  },

  render: function() {

    return (
      <span>hall
      </span>
    );
  }

});

var kitchen = React.createClass({
  getInitialState: function() {
    return {kitchen: 0}
  },

  render: function() {

    return (
      <span>kitchen
      </span>
    );
  }

});

ReactDOM.render(
  <hall/>,
  document.getElementById('hall')
);


ReactDOM.render(
  <kitchen/>,
  document.getElementById('kitchen')
);

console.log('aaa');
