import axios from 'axios';
import { useEffect } from 'react';
import './Filter.css';

const Filter = ({
	setCategory,
	setAllCategories,
	allCategories,
	setOrder,
	setSort,
}) => {
	useEffect(() => {
		axios
			.get(
				'https://scotts-game-app.herokuapp.com/api/categories'
			)
			.then((res) => {
				setAllCategories(res.data.categories);
			});
	}, [setAllCategories]);

	return (
		<div className='filter-container'>
			<select
				name='category'
				id=''
				className='category-select'
				onChange={(e) => {
					setCategory(e.target.value);
				}}
			>
				<option value='' defaultChecked>
					All Categories
				</option>
				;
				{allCategories.map((category) => {
					return (
						<option
							value={category.slug}
							className='category-option'
						>
							{category.slug}
						</option>
					);
				})}
			</select>
			<select
				name='order'
				id='order'
				className='category-select'
				onChange={(e) => {
					setOrder(e.target.value);
				}}
			>
				<option value='asc' defaultChecked>
					ASC
				</option>
				<option value='desc'>DESC</option>
			</select>
			<select
				name='sort'
				id='sort'
				className='category-select'
				onChange={(e) => {
					setSort(e.target.value);
				}}
			>
				<option value='created_at'>Date</option>
				<option value='votes'>Votes</option>
			</select>
		</div>
	);
};

export default Filter;
