# Contributing to AltCred

Thank you for your interest in contributing to AltCred! This project is a production-grade ML-powered alternative credit scoring platform.

## How to Contribute

1.  **Fork the Repository**: Create your own copy of the repository.
2.  **Create a Feature Branch**: Use a descriptive name like `feat/new-scoring-logic` or `fix/api-latency`.
3.  **Implement Changes**: Ensure your code follows the established patterns in the backend (Node/Express) or ML (FastAPI) modules.
4.  **Tests**: If you add logic, please add corresponding tests or verify via the Monitoring Dashboard.
5.  **Submit a Pull Request**: Describe your changes in detail and include screenshots if applicable.

## Development Guidelines

- **Python**: Follow PEP 8. Use `ml/inference/feature_service.py` for any new preprocessing logic to maintain consistency.
- **Node.js**: Use async/await for all database and service calls. Ensure new modules are registered in `backend/src/app.js`.
- **Frontend**: Use Tailwind CSS for styling and Recharts for new visualizations.

## Commit Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `chore:` for general maintenance

Amazee! We look forward to your contributions.
