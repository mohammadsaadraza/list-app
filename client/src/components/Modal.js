import React from "react";

const Modal = (props) => {
	return (
		<div
			ref={props.reference}
			className="modal fade"
			id={props.id}
			data-backdrop="static"
			data-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							{props.header}
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">{props.body}</div>
					<div className="modal-footer">{props.actions}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
