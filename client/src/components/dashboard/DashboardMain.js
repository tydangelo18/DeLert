import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/dashboard/DashboardMain.css';
import Profile from '../profiles/Profile';
import GamesLineChart from '../charts/GamesLineChart';
import DisplayGameMain from '../games/DisplayGameMain';

const DashboardMain = ({ auth: { user } }) => {
  return (
    <main>
      <div class='main__container'>
        <div class='main__title'>
          <div class='main__greeting'>
            <h1>Hello, {user && user.name}.</h1>
            <p>Welcome to your bowling dashboard.</p>
          </div>
        </div>
        <Profile />

        <div className='charts'>
          <div className='charts__left'>
            <div className='charts__left__title'>
              <div>
                <h1>My Overall Progress</h1>
                <p>All Games</p>
              </div>
              <i class='fas fa-chart-line'></i>
            </div>
            <GamesLineChart />
          </div>

          <DisplayGameMain />
        </div>
      </div>
    </main>
  );
};

DashboardMain.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardMain);
