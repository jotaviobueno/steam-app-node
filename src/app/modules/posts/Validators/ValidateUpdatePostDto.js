export function validateUpdatePostDto(updatePostDto) {
	if (
		! updatePostDto.title,
		! updatePostDto.description
	)
		return true;
    
	return false;
}