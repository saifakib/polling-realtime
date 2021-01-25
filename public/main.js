const form = document.getElementById("vote-form");

//Form Submit Event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const choise = document.querySelector('input[name=game]:checked').value;
    const data = { game: choise };

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
})

let dataPoints = [
    { label: 'Football', y: 0 },
    { label: 'Cricket', y: 0 },
    { label: 'Hockey', y: 0 },
    { label: 'Tenis', y: 0 },
];

const chartContainer = document.getElementById('chartContainer');
if (chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('7674db2fe393342a6a78', {
        cluster: 'ap2'
    });

    var channel = pusher.subscribe('game-poll');
    channel.bind('game-vote', function (data) {
        dataPoints = dataPoints.map(x => {
            if(x.label == data.game) {
                x.y += data.points
                return x;
            } else {
                return x;
            }
        })
        chart.render();
    });
}

