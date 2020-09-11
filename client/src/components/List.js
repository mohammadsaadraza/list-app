import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Modal from "./Modal";

const List = (props) => {
	const addItemModal = useRef();
	const listName = props.match.params.list;
	const [loading, setLoading] = useState(true);
	const [list, setList] = useState(null);
	const [addItemValue, setItem] = useState("");

	useEffect(() => {
		const fetchList = async () => {
			try {
				const { data } = await axios.get(`/api/v1/lists/getList/${listName}`);
				if (data.success) {
					setList(data.data);
					setLoading(false);
				} else {
					props.history.push("/");
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchList();
	}, [listName, props.history]);

	useEffect(() => {
		const updateList = async () => {
			try {
				const { data } = await axios.patch(
					`/api/v1/lists/updateList/${list.name}`,
					list
				);
				if (!data.success) {
					props.history.push("/");
					console.log(data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (list) {
			updateList();
		}
	}, [list, props.history]);

	const onAddItem = () => {
		setItem("");
		setList({
			...list,
			items: [
				...list.items,
				{ term: addItemValue, lastModified: new Date().toLocaleString() },
			],
		});
	};

	const onDeletetem = (item) => {
		var newItemsList = list.items.filter((oldItem) => {
			return oldItem.term !== item.term;
		});
		setList({
			...list,
			items: newItemsList,
		});
	};

	const renderList = () => {
		if (!loading) {
			return list.items.map((item) => {
				return (
					<li
						className="list-group-item d-flex justify-content-between align-items-center"
						key={item.term}
					>
						<span className="font-weight-bold">{item.term}</span>
						<div className="d-flex align-items-center">
							<span className="text-muted">{item.lastModified}</span>
							<span className="btn" onClick={() => onDeletetem(item)}>
								<svg
									width="1.4em"
									height="1.4em"
									viewBox="0 0 16 16"
									className="bi bi-trash-fill text-danger"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
									/>
								</svg>
							</span>
						</div>
					</li>
				);
			});
		} else {
			return (
				<li className="list-group-item d-flex justify-content-center">
					<div className="spinner-border mb-2" role="status"></div>
				</li>
			);
		}
	};

	const renderBody = (
		<form>
			<div className="form-group">
				<label htmlFor="list-text" className="col-form-label">
					Item:
				</label>
				<input
					className="form-control"
					id="list-text"
					value={addItemValue}
					onChange={(e) => setItem(e.target.value)}
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
				onClick={onAddItem}
			>
				Add
			</button>
		</>
	);

	return (
		<React.Fragment>
			<Header />
			<div className="container mt-5">
				<button
					className="btn btn-danger btn-medium mb-4"
					data-toggle="modal"
					data-target="#addItemModal"
				>
					Add Item
				</button>

				<div className="list-group">{renderList()}</div>

				<Modal
					reference={addItemModal}
					header="Enter an item name"
					id="addItemModal"
					body={renderBody}
					actions={renderActions}
				/>
			</div>
		</React.Fragment>
	);
};

export default List;
