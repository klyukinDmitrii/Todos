import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos/')
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodoList(loadedTodos);
			})
			.catch((error) => console.error('Ошибка при загрузке данных:', error))
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			});
	}, []);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loading}></div>
			) : (
				<>
					<h1>Список дел</h1>
					{todoList.map(({ id, title }) => (
						<ul key={id}>
							<li key={id}>{title}</li>
						</ul>
					))}
				</>
			)}
		</div>
	);
};
