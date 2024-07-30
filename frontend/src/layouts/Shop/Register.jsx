import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, message, Form } from "antd";

const { Option } = Select;

const ShopRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shopName: "",
    country: "",
    phone_number: "",
    email: "",
    description: "",
    password: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, category_id: value });
    const selectedCategory = categories.find(
      (category) => category.id === value
    );
    setSelectedCategoryName(selectedCategory ? selectedCategory.name : "");
  };

  const handleSubmit = async (values) => {
    if (
      !form.shopName ||
      !form.country ||
      !form.phone_number ||
      !form.email ||
      !form.password ||
      !form.category_id
    ) {
      message.error("Please fill in all fields.");
      return;
    }

    const dataToSend = {
      ...form,
      role_id: 3,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/shops/register",
        dataToSend
      );
      if (response.data.success) {
        message.success("Shop registered successfully!");
        navigate("/shopLogin");
      } else {
        message.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      message.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={form}
      style={{ margin: "60px", paddingLeft: "50px", paddingRight: "50px" }}
    >
      <h3>Register Shop</h3>
      <Form.Item
        label="Shop Name"
        name="shopName"
        rules={[{ required: true, message: "Please input your shop name!" }]}
      >
        <Input
          name="shopName"
          onChange={handleChange}
          placeholder="Shop Name"
        />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input your country!" }]}
      >
        <Input name="country" onChange={handleChange} placeholder="Country" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone_number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input
          name="phone_number"
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input name="email" onChange={handleChange} placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input
          name="description"
          onChange={handleChange}
          placeholder="Description"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_id"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select
          name="category_id"
          value={form.category_id}
          onChange={handleCategoryChange}
          placeholder="Select a category"
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShopRegister;
