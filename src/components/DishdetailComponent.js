import React, { Component } from 'react';
import { Card, CardImgOverlay, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem,
     Button, Jumbotron, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);

            this.state = {
                isModelOpen: false
            }

            this.CommentModalSwitch = this.CommentModalSwitch.bind(this);
            console.log("Comment Form props", props);
        }

        CommentModalSwitch() {

            this.setState({
                isModelOpen: !this.state.isModelOpen
            })
        }

        handleCommentSubmit(values) {
            this.CommentModalSwitch();

            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render() {
            return(
            <React.Fragment>
            <Button className="mt-4" outline onClick={this.CommentModalSwitch}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            
                <Modal isOpen={this.state.isModelOpen} toggle={this.CommentModalSwitch}>
                    <ModalHeader toggle={this.CommentModalSwitch}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control custom-select" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }} />
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Your Name</Label>
                                    <Control.textarea rows="6" model=".comment" id="comment" name="comment" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            );
        }
    }

    function CommentView(comment){
        
        // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const comments = comment.map((dishComment) => {
            // const commentDate = new Date(dishComment.date);
            return(
                <div key={dishComment.id}>
                <p>{dishComment.comment}</p>
            <p>-- 
                {/* {dishComment.author} , {monthNames[commentDate.getMonth()]} {(commentDate.getDate() < 10 ? ("0"+commentDate.getDate()) : commentDate.getDate())}, {(commentDate.getFullYear()) } */}
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(dishComment.date)))}
                </p>
                </div>
            );
        })
        return comments;
    }

 
    function RenderDish({dish}) {

        if(dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else {
            return(
                <div></div>
            )
        }
    }

    function RenderComments({comments, dishId, addComment}){

        if(comments != null){
            if(comments.length !== 0){return(
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {CommentView(comments)}
                </ul>
                <div>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
                </div>
            )}
        }else {
            return(
            <div></div>
            )
        }
    }

    const DishDetail = (props) => {

        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if(props.dish != null){
        return (

            <div className="container">
                <div className="row">
                    <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12"><h3>{props.dish.name}</h3></div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>

                </div>
            </div>
            
        );
    }
    }


export default DishDetail;