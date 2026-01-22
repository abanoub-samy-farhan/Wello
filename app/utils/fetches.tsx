import User from '../interfaces';

export async function fetchUser() {
    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      const fetchedUser: User = {
        user_id: data.id,
        email: data.email,
        address: data.address,
        full_name: data.full_name,
        phone_number: data.phone_number,
        is_suspended: data.is_suspended,
        is_verified: data.is_verified,
        is_first_login: data.is_first_login,
      };

      console.log('Fetched user:', fetchedUser);
      return fetchedUser;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  export async function updateUser(user: User){
      try {
        const userJson = JSON.stringify({
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
          is_suspended: user.is_suspended,
          address: user.address,
        });
  
        await fetch('http://localhost:8000/api/user/',
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: userJson,
          }
        ).then((res) => {
          if (res.ok) {
            console.log('Success');
          }
          else {
            console.log('Failed');
          }
        }); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

export async function MoneyTransfer(userId, TransferType, amount){
  let status = false;
  await fetch('http://localhost:8000/api/transaction/create/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Number(amount),
      recipient_id: userId,
      transaction_type: TransferType
    })
  }).then((res) =>{
    if (res.status == 201){
      status = true;
    }
  })
  return status;
}

export async function FetchNotification(){
  const response = await fetch('http://localhost:8000/api/notifications/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }

  })

  const data = response.json();

  return data;
    
}

export async function FetchTransactions(){
  const response = await fetch('http://localhost:8000/api/transactions/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }

  })

  const data = response.json();

  return data;
    
}

export async function ResolveRequest(transactionId, status){
  const response = await fetch('http://localhost:8000/api/transaction/resolve/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transaction_id: transactionId,
      action: status
    })
  })

  if (response.status == 200){
    return true;
  }
  else{
    return false;
  } 
}

export async function MakePurchase(company, amount){
  let response = await fetch('http://localhost:8000/api/transaction/create/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company: company,
      transaction_type: "Purchase",
      amount: Number(amount)
    })
  })

  if (response.status == 201){
    return true;
  }
  else{
    return false;
  } 
}

export async function isSignedIn(){
  const response = await fetch('http://localhost:8000/api/signed', {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) return true;
  return false;
}

export async function checkSignedIn(){
  return await isSignedIn();
}

export async function SwitchPrimaryMethod(){
  const response = await fetch('http://localhost:8000/api/payment/switch-primary-method/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status == 200){
    return true;
  }
  else{
    return false;
  }
}

