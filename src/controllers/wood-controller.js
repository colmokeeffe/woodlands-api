import { WoodSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
export const woodController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const wood = await db.woodStore.getWoodById(request.params.woodid);
      const viewData = {
        title: "Edit Wood",
        category: category,
        wood: wood,
      };
      return h.view("wood-view", viewData);
    },
  },
  /*uploadImage: {
    handler: async function(request, h) {
      try {
        const wood = await db.woodStore.getWoodById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          wood.img = url;
          await db.woodStore.updateWood(wood);
        }
        return h.redirect(`/wood/${wood._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/wood/${wood._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },*/

  update: {
    validate: {
      payload: WoodSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("wood-view", { title: "Edit wood error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const wood = await db.woodStore.getWoodById(request.params.woodid);
      const newWood = {
        title: request.payload.title,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.woodStore.updateWood(wood, newWood);
      return h.redirect(`/category/${request.params.id}`);
    },
  },
};
