import React, { useState, useRef } from "react";
import Modal from "./Modal";
import history from "../utils/history";
import axios from "axios";
import "../css/ListName.css";

const ListName = () => {
	const modal = useRef();
	const [listValue, setListValue] = useState("");
	const [loading, setLoading] = useState({
		value: false,
		text: "Loading...",
	});

	const onListValueChange = (e) => {
		setListValue(e.target.value);
	};

	const onOpenList = async () => {
		setLoading({ ...loading, value: true });
		modal.current.hidden = true;
		try {
			const { data } = await axios.get(`/api/v1/lists/getList/${listValue}`);
			if (data.success) {
				setTimeout(() => {
					setLoading({ ...loading, value: false });
					history.push(`/${data.data.name}`);
				}, 1000);
			} else {
				const { data } = await axios.post(`/api/v1/lists/createList`, {
					name: listValue,
				});
				setLoading({ ...loading, text: "Creating a new list...", value: true });
				setTimeout(() => {
					setLoading({ ...loading, value: false });
					history.push(`/${data.data.name}`);
				}, 3000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const renderSpinner = () => {
		if (loading.value) {
			return (
				<div className="spinner-background">
					<div className="spinner">
						<div className="spinner-border mb-2" role="status"></div>
						<div>{loading.text}</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	};

	const renderBody = (
		<form>
			<div className="form-group">
				<label htmlFor="list-text" className="col-form-label">
					Name:
				</label>
				<input
					className="form-control"
					id="list-text"
					value={listValue}
					onChange={onListValueChange}
				></input>
			</div>
		</form>
	);

	const renderActions = (
		<>
			<button type="button" className="btn btn-secondary" data-dismiss="modal">
				Close
			</button>
			<button
				type="button"
				className="btn btn-danger"
				data-dismiss="modal"
				onClick={onOpenList}
			>
				Open List
			</button>
		</>
	);

	return (
		<div className="landing">
			{renderSpinner()}
			<div className="showcase">
				<h2>List App</h2>
				<button
					type="button"
					className="btn btn-danger btn-large"
					data-toggle="modal"
					data-target="#listModal"
				>
					View your list
				</button>
			</div>
			<Modal
				reference={modal}
				header="Enter a list name"
				id="listModal"
				body={renderBody}
				actions={renderActions}
			/>
		</div>
	);
};

export default ListName;
