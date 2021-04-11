const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { RoomID } = ctx.params;

    const entity = await strapi.services.room.findOne({ RoomID });
    return sanitizeEntity(entity, { model: strapi.models.room });
  },
};