import React, { Component } from 'react';
import { Card, CardImgOverlay, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

    }

    commentView(dish){
        
        // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const comments = dish.comments.map((dishComment) => {
            const commentDate = new Date(dishComment.date);
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
 
    renderDish(dish) {
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

    renderComments(dish){

        if(dish != null){
            if(dish.comments.length !== 0){return(
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {this.commentView(dish)}
                </ul>
                </div>
            )}
        }else {
            return(
            <div></div>
            )
        }
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>

            </div>
            
        );
    }
}

export default DishDetail;