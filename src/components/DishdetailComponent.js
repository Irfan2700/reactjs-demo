import React from 'react';
import { Card, CardImgOverlay, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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

    function RenderComments({comments}){

        if(comments != null){
            if(comments.length !== 0){return(
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {CommentView(comments)}
                </ul>
                </div>
            )}
        }else {
            return(
            <div></div>
            )
        }
    }

    const DishDetail = (props) => {
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
                        <RenderComments comments={props.comments}/>
                    </div>

                </div>
            </div>
            
        );
    }
    }


export default DishDetail;