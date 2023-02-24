export function validateUpdatePhoneDto(UpdatePhoneDto) {
	if (
		! UpdatePhoneDto.dddi,
		! UpdatePhoneDto.ddd,
		! UpdatePhoneDto.number
	)
		return true;
    
	return false;
}