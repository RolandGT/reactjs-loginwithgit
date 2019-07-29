import React, { useState, useEffect } from 'react';

import Profile from '../../components/Profile/Profile';

const User = props => {
  const [loadedUser, setLoadedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(props.input)

  const fetchData = props => {
    console.log(
      'Sending Http request for new character with id '
    );
    setIsLoading(true);
    fetch('https://api.github.com/search/users?q='+props.input)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        console.log(response)
        // return response.json();
        return response;
      })
      .then(userData => {
          console.log(userData);
        const loadedUser = {
          
        //   name: userData.name,
          
        };
        setIsLoading(false);
        setLoadedUser(loadedUser);
      })
      .catch(err => {
        console.log(err);
        console.log('nu va')
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up...');
    };
  }, [props.input]);

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading User...</p>;

  if (!isLoading && loadedUser.id) {
    content = (
      <Profile name={loadedUser.name}/>
    );
  } else if (!isLoading && !loadedUser.id) {
    content = <p>Failed to fetch user.</p>;
  }
  return content;
};

export default React.memo(User);
