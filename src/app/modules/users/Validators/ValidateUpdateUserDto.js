export function validateUpdateUserDto(updateUserDto) {
	if (
		! updateUserDto.first_name,
		! updateUserDto.last_name,
		! updateUserDto.username,
		! updateUserDto.password
	)
		return true;
    
	return false;
}