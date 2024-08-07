import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setShops } from "../../Service/api/redux/reducers/shop/shop";
import Table from "react-bootstrap/Table";
import Flag from "react-flagkit";
import CountryList from "country-list";

const ShopsList = () => {
  const dispatch = useDispatch();

  const { shops } = useSelector((state) => {
    return {
      shops: state.shops.shops,
    };
  });

  const countries = CountryList.getData();
  const countryCodeMap = Object.fromEntries(
    countries.map(({ code, name }) => [name.toLowerCase(), code])
  );

  const getAllShops = () => {
    axios
      .get("http://localhost:5000/shops")
      .then((result) => {
        dispatch(setShops(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllShops();
  }, []);
  return (
    <div className="container mt-3">
      <h3 className="mb-4">Shops List</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Shop Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop, i) => {
            const countryCode =
              countryCodeMap[shop.country.toLowerCase()] || null;

            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{shop.shopname}</td>
                <td>{shop.name}</td>
                <td>{shop.discreption}</td>
                <td>{shop.email}</td>
                <td>
                  {countryCode ? (
                    <>
                      <Flag
                        country={countryCode}
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      {shop.country}
                    </>
                  ) : (
                    shop.country
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ShopsList;
