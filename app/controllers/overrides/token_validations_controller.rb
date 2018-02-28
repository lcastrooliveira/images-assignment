module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    def render_validate_token_success
      payload = { data: @resource.as_json(except: [:image, :image_id]) }
      payload[:data][:image_content_url] = image_content_url(@resource.image) unless @resource.image.nil?
      render json: payload
    end
  end
end
