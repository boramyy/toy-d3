(function(){

  var data = [
    {
      "month": 12,
      "charge": 28,
      "amount": 60000
    },
    {
      "month": 1,
      "charge": 50,
      "amount": 55000
    },
    {
      "month": 2,
      "charge": 10,
      "amount": 95000
    },
    {
      "month": 3,
      "charge": 80,
      "amount": 82300
    },
    {
      "month": 4,
      "charge": 60,
      "amount": 100000
    },
    {
      "month": 5,
      "charge": 30,
      "amount": 72000
    },
    {
      "month": 6,
      "charge": 20,
      "amount": 93000
    },
    {
      "month": 7,
      "charge": 10,
      "amount": 42000
    },
    {
      "month": 8,
      "charge": 10,
      "amount": 50000
    },
    {
      "month": 9,
      "charge": 65,
      "amount": 56000
    },
    {
      "month": 10,
      "charge": 17,
      "amount": 90000
    },
    {
      "month": 11,
      "charge": 30,
      "amount": 50000
    },
    {
      "month": 12,
      "charge": 28,
      "amount": 73000
    }
  ]

  function maxNum(arr, key) {
    var num = arr[0][key] || -1
    for (var i = 0; i < arr.length; i ++) {
      var currentNum = arr[i][key]
      if (num < currentNum) {
        num = currentNum
      }
    }
    return num
  }
  
  var MAX_HEIGHT = 169;
  var BAR_WIDTH = 4
  var BAR_MARGIN_RIGHT = 15
  var MAX_CHARGE = maxNum(data, 'charge')
  var MAX_AMOUNT = maxNum(data, 'amount')
  var X_START_POINT = 53
  var Y_START_POINT = 5
  
  window.onload = function() {

    var barScale = d3.scaleLinear().domain([0, MAX_CHARGE]).range([0, MAX_HEIGHT]);

    d3.select('#hoho2')
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .classed('bar', true)
      .attr("x", function (d, i) { return i * (BAR_WIDTH + BAR_MARGIN_RIGHT) + X_START_POINT})
      .attr("y", function (d) { return MAX_HEIGHT - barScale(d.charge) + Y_START_POINT})
      .attr('fill', '#FFCD00')
      .attr('rx', '2px')
      .attr('ry', '2px')
      .attr('width', BAR_WIDTH + 'px')
      .attr('height', function (d) { return barScale(d.charge) + 'px' })


    // 꺾은선
    // var data2 = [[0, 100], [15, 3000], [30, 1000], [45, 1350], [60, 7000], [75, 2500], [90, 3000], [105, 1000], [120, 1350], [135, 5000], [150, 5000], [165, 1000], [180, 1350]];
    var lineWidth = BAR_WIDTH + BAR_MARGIN_RIGHT
    var shapeScale = d3.scaleLinear().domain([MAX_AMOUNT, 0]).range([0, MAX_HEIGHT])
    var lineGenerator = d3.line()
      .x(function (d, i) { return i * lineWidth + 2 + X_START_POINT })
      .y(function (d) { return shapeScale(d.amount) + Y_START_POINT })
    
    var pathString = lineGenerator(data)

    d3.select('#hoho2')
      .append('g')
      .append('path')
      .style('border-width', '2px')
      .attr('fill', 'none')
      .attr('stroke', '#B0D7F8')
      .attr('d', pathString);

    // d3.select('#hoho2')
    //   .attr("transform", `translate(${margin.left},0)`)
    //   .call(d3.axisLeft(y).ticks(null, data.format))
    //   .call(g => g.select(".domain").remove())
    //   .call(g => g.append("text")
    //     .attr("x", -margin.left)
    //     .attr("y", 10)
    //     .attr("fill", "currentColor")
    //     .attr("text-anchor", "start")
    //     .text(data.y))

    d3.select('#hoho2')
      .append('g')
      .attr('transform', 'translate(53, 0)')
      .call(d3.axisLeft(shapeScale.range([0 + Y_START_POINT, MAX_HEIGHT + Y_START_POINT])).ticks(5))
      .style('font-size', '12px')
      .style('color', '#999')
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll("line").remove())

    d3.select('#hoho2')
      .append('g')
      .attr('transform', 'translate(288, 0)')
      .call(d3.axisRight(barScale.domain([MAX_CHARGE, 0]).range([0 + Y_START_POINT, MAX_HEIGHT + Y_START_POINT])).ticks(5))
      .style('font-size', '12px')
      .style('color', '#999')
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll("line").remove())
  }
  
  // 45+8 : 227 : 38+8
  //
  
})()