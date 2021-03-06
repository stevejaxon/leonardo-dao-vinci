import React, { Component } from "react";
import { Card, Box, Flex, Image, Heading, TextButton } from "rimble-ui";

class CardsUI extends Component {
    constructor(props) {
        super(props);
        this.state = { leftPosition : "50%",  topPosition : "60px" };
      }

  render() {
    return (
      <Card
        width={"420px"}
        mx={"auto"}
        my={5}
        p={0}
        style={{
          position: "absolute",
          top: this.state.topPosition,
          left: this.state.leftPosition,
          width: "400px",
          marginLeft: "-200px",
          transition: "left 2s ease 0s",
        }}
      >
        <Image
          width={1}
          src="https://source.unsplash.com/random/1280x720"
          alt="random image from unsplash.com"
        />
        <Flex
          px={4}
          height={3}
          borderTop={1}
          borderColor={"#E8E8E8"}
          style={{ height: "100px" }}
        >
          <TextButton onClick={()=>(this.setState({leftPosition : '-10000px'}))} p={"0"} mr={4} height={"auto"}>
            Next
          </TextButton>
          <TextButton onClick={()=>(this.setState({leftPosition : '10000px'}))} p={"0"} height={"auto"} style={{ marginLeft: "auto" }} on>
            Like
          </TextButton>
        </Flex>
      </Card>
    );
  }
}
export default class Voter extends Component {
  render() {
    return (
      <div style={{ height: "80vh", position: "relative" }}>
        <CardsUI />
        <CardsUI />
        <CardsUI />
        <CardsUI />
        <CardsUI />
        <CardsUI />
        <CardsUI />
        <CardsUI />
      </div>
    );
  }
}
