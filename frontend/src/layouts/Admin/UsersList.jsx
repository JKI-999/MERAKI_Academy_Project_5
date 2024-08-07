import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUsers } from "../../Service/api/redux/reducers/user/user";
import Table from "react-bootstrap/Table";
import Flag from "react-flagkit";
import CountryList from "country-list";

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => {
    return {
      users: state.users.users,
    };
  });

  const countries = CountryList.getData();
  const countryCodeMap = Object.fromEntries(
    countries.map(({ code, name }) => [name.toLowerCase(), code])
  );

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((result) => {
        dispatch(setUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="container mt-3">
      <h3 className="mb-4">Users List</h3>
      <Table responsive className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col">Age</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            const countryCode =
              countryCodeMap[user.country.toLowerCase()] || null;

            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {countryCode ? (
                    <>
                      <Flag
                        country={countryCode}
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      {user.country}
                    </>
                  ) : (
                    user.country
                  )}
                </td>
                <td>{user.age}</td>
                <td>{user.role_id === 1 ? "Admin" : "User"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
