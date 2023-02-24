export function validateUpdateAddressDto(updateAddressDto) {
	if (
		! updateAddressDto.street,
		! updateAddressDto.city,
		! updateAddressDto.neighborhood,
		! updateAddressDto.state,
		! updateAddressDto.house_number, 
		! updateAddressDto.zip
	)
		return true;
    
	return false;
}