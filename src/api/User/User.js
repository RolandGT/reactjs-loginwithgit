import React, { useState, useEffect } from 'react';

const User = props => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = user => {
    console.log(
      'Sending Http request for new search query with name '
    );
    console.log(props.input);
    setIsLoading(true);
    fetch('https://api.github.com/search/users?q='+props.input)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch user!');
        }
        console.log(response)
        return response.json();
        
      })
      .then(response => {
        console.log(response.items);
        setLoadedUsers (response.items);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
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
  let usersArray = [];
  if (!isLoading && loadedUsers) {
    // content = <Profile  users={loadedUsers} />
    
    loadedUsers.map((item, i) => (
      usersArray.push(<li  key={i}>
          <span >{ item.login }</span>
      </li>)
     
    ))
    content = usersArray
    
  } else if (!isLoading && !loadedUsers) {
    content = <p>Failed to fetch user.</p>;
  }
  return content;
};

export default React.memo(User);
