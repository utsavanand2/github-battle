docker-build:
	docker buildx build \
		--platform linux/amd64,linux/arm/v7,linux/arm64 \
		--output "type=image,push=true" \
		-t utsavanand2/popular-repos:v0.0.1 \
		-t utsavanand2/popular-repos:latest .
