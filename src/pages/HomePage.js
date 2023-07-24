import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  //dependency is empty [], because we only want this fetch to run once (never fires again)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:1234/posts`);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <Container className="m-4">
      <Row>
        {posts.map((post) => (
          <Col md={4} className="mb-4" key={post._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={post.image} alt={post.title} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.author}</Card.Text>
                <Link to={`/posts/${post._id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
