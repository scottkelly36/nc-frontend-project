import axios from 'axios';
import { useEffect, useState } from 'react';
import './Filter.css';

const Filter = ({
	setCategory,
	setAllCategories,
	allCategories,
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
		</div>
	);
};

export default Filter;
