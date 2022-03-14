import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// Предохранитель ошибок
class ErrorBoundary extends Component {
	state = {
		error: false,
	};

	// componentDidCatch catch errors in method Render, in methods licecycle, in constructor!
	// componentDidCatch dont catch errors in listeners, async code, server rendering!

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({ error: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
