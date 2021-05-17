import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getGames } from '../../actions/game';

const GamesLineChart = ({ getGames, game: { games } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'My Overall Progress',
        data: (games || []).map(({ score }) => score),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div
        className='allGameChart'
        style={{ position: 'relative', height: '40vh', width: '45vw' }}
      >
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

GamesLineChart.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(GamesLineChart);
